from lib.util import randomString
from locust import HttpLocust, TaskSet, task, between
import random
import faker


class UserBehavior(TaskSet):
    def on_start(self):
        self.login()
        self.makeLobbies(20)
        self.joinALobby()

    def joinALobby(self):
        # join some random lobby :P
        lobby_list = self.client.get("/api/lobbies/").json()
        if len(lobby_list) > 20:
            lobby_list = lobby_list[0:20]
        
        self.lobby_id = str(random.choice(lobby_list)["id"])

        # get info for the lobby we just joined
        self.client.get("/api/lobbies/" + self.lobby_id,
                        name="/api/lobbies/:lobby_id")

    # create num lobbies
    def makeLobbies(self, num):
        # check if there are enough lobbies
        lobby_list = self.client.get("/api/lobbies/").json()
        if (len(lobby_list) == 0):
            id = 1
        else:
            id = lobby_list[len(lobby_list)-1]["id"]

        while (id <= num):
            new_lobby = self.client.post("/api/lobbies", json={
                "title": "title",
                "desc": "a desc",
                "currentVideoId": "LDQcgkDn0yU"
            }).json()
            id = new_lobby["id"]

    def login(self):
        username = randomString()
        password = randomString()

        print("new user username: " + username + " password: " + password)

        self.client.post("/api/signup", json={
            "user": {
                "name": username,
                "password": password
            }
        })

        self.client.post("/api/login", json={
            "name": username,
            "password": password
        })

    @task(1)
    def create_lobby(self):
        new_lobby = self.client.post("/api/lobbies", json={
            "title": "title",
            "desc": "a desc",
            "currentVideoId": "LDQcgkDn0yU"
        }).json()


    @task(80)
    class JoinLobby(TaskSet):
        """
            actions
                - list lobbies
                - pick a lobby and join it
                - request new messages from the lobby
                - possibly post a new message to the lobby
        """
        wait_time = between(1, 2)
        latest_message_id = 0

        @task(80)
        def post_message_and_get_new_messages(self):
            # get new messages for the lobby
            new_messages = self.client.get("/api/lobbies/%s/lobby_messages/new_messages/%s" % (self.parent.lobby_id, self.latest_message_id),
                                           name="/api/lobbies/:lobby_id/lobby_messages/new_messages/:latest_msg_seqno").json()
            print(new_messages)
            if len(new_messages) > 0:
                self.latest_message_id = max(
                    self.latest_message_id,
                    max(msg["id"] for msg in new_messages)
                )
            # post a test message to the other users in the lobby!
            if random.randint(0, 5) >= 3:
                self.parent.client.post("/api/lobbies/%s/lobby_messages/" % self.parent.lobby_id, json={
                    "lobby_message": {
                        "message": randomString()
                    }
                }, name="/api/lobbies/:lobby_id/lobby_messages/")

        latest_seq_no = 0
        @task(15)
        def add_video_and_get_video_queue(self):
            new_videos = self.client.get("/api/lobbies/%s/queued_videos/new_videos/%s" % (self.parent.lobby_id, self.latest_seq_no),
                                         name="/api/lobbies/:lobby_id/queued_videos/new_videos/:latest_seqno").json()
            if len(new_videos) > 0:
                self.latest_seq_no = max(
                    self.latest_seq_no,
                    max(video["id"] for video in new_videos)
                )
            self.parent.client.post("/api/lobbies/%s/queued_videos" % (self.parent.lobby_id), json={
                "queued_video": {
                    "lobby_id": self.parent.lobby_id,
                    "video": "https://www.youtube.com/watch?v=Zt8wH_yD8AY"
                }
            }, name="/api/lobbies/:lobby_id/queued_videos/")

        @task(5)
        def logout(self):
            self.parent.client.get("/api/logout")
            self.parent.login()
            self.parent.joinALobby()


# on set up action
# set up 5-10 lobbies
# run a function before the tests start running

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(1, 2)  # wait 5 to 15 seconds between requests
