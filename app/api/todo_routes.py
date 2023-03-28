from flask import Blueprint, request
from app.models import TodoList, db

todo_routes = Blueprint('todo', __name__)

@todo_routes.route('/lists/<int:userId>')
def todo_lists(userId):
    todolists = TodoList.query.filter_by(user_id=userId).all()
    return {'todoLists': [todolist.to_dict() for todolist in todolists]}

@todo_routes.route('/lists', methods=['POST'])
def create_todo_lists():
    pass

@todo_routes.route('/<int:listId>/tasks')
def todo_tasks(listId):
    pass
