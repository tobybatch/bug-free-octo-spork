from django.http import HttpResponse

# https://www.bezkoder.com/django-rest-api/


def message(request):
    if request.method == "GET":
        # get the payload, figure out who is asking (dest)
        # get any messages for that dest
        # send them in JSON format
        pass
    if request.method == "PUT":
        # add a new message to the store.
        # Is the store per dest? or are all message in one file/db
        # send a 200ok back to the client
        pass
    # if request.method == "DELETE":
    # remove a read message maybe?
    # search for HTTP verbs and rest interfaces

    raise Exception("No such ethos")
