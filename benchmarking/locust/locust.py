from lib.util import randomString
from locust import HttpLocust, TaskSet, task, between
import random
import faker


class UserBehavior(TaskSet):
    def on_start(self):
        self.login()
        lobby_list = self.client.get("/api/lobbies/").json()
        self.lobby_id = str(random.choice(lobby_list)["id"])
        self.get_lobby_metadata()

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

    def get_lobby_metadata(self):
        self.client.get("/api/lobbies/" + self.lobby_id,
                        name="/api/lobbies/:lobby_id")

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


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(1, 2)  # wait 5 to 15 seconds between requests
