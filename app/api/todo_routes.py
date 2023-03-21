from flask import Blueprint, request

todo_routes = Blueprint('todo', __name__)

@todo_routes.route('/list')
def todo_lists():
    pass

@todo_routes.route('/<int:listId>/tasks')
def todo_tasks(listId):
    pass
