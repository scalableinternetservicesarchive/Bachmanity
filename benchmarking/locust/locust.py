from locust import HttpLocust, TaskSet, task, between
import random
from lib.util import randomString


class UserBehavior(TaskSet):
    def on_start(self):
        self.login()

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

    # refresh the list of lobbies
    # @task(1)
    # def refresh_feed(self):
    #     print("REFRESHING THE FEED!")
    #     # TODO: differential sync for lobbies
    #     self.client.get("/api/lobbies/")

    # fetch a random lobby
    @task(2)
    class JoinLobby(TaskSequence):
        wait_time = between(1, 2)

        lobby_id = "-1"
        latest_message_id = 0

        def on_start(self):
            lobby_list = self.client.get("/api/lobbies/").json()
            self.lobby_id = str(random.choice(lobby_list)["id"])

        @seq_task(1)
        def get_lobby_metadata(self):
            self.client.get("/api/lobbies/" + self.lobby_id,
                            name="/api/lobbies/:lobby_id")

        @seq_task(2)
        @task(20)
        def post_message_and_get_new_messages(self):
            # get new messages for the lobby
            new_messages = self.client.get("/api/lobbies/%s/lobby_messages/new_messages/%s" % (self.lobby_id, self.latest_message_id),
                                           name="/api/lobbies/:lobby_id/lobby_messages/new_messages/:latest_msg_seqno").json()
            if len(new_messages) > 0:
                self.latest_message_id = max(
                    self.latest_message_id,
                    max(msg["id"] for msg in new_messages)
                )
            # post a test message to the other users in the lobby!
            if random.randint(0, 5) >= 3:
                self.client.post("/api/lobbies/%s/lobby_messages/" % self.lobby_id, json={
                    "lobby_message": {
                        "message": randomString()
                    }
                }, name="/api/lobbies/:lobby_id/lobby_messages/")


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(1, 2)  # wait 5 to 15 seconds between requests