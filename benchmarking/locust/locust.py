from locust import HttpLocust, TaskSet, task, between
import random


class UserBehavior(TaskSet):
    def on_start(self):
        self.login()

    def login(self):
        self.client.post("/api/login", data={
            "name": "test",
            "password": "test"
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

        def on_start(self):
            print("RUNNING THE JOIN LOBBY TASK SEQUENCE!")
            lobby_list = self.client.get("/api/lobbies/").json()
            self.lobby_id = str(random.choice(lobby_list)["id"])

        @seq_task(1)
        def get_lobby_metadata(self):
            self.client.get("/api/lobbies/" + self.lobby_id,
                            name="/api/lobbies/[id]")

        @seq_task(2)
        def post_message_and_get_new_messages(self):
            pass


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(1, 2)  # wait 5 to 15 seconds between requests
