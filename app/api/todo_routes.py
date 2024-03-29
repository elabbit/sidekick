from flask import Blueprint, request
from app.models import TodoList, db, TodoTask
from app.forms import ToDoListForm, EditToDoListForm, TaskForm

todo_routes = Blueprint('todo', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
            # errorMessages.append(f'{field} : {error}')
    return errorMessages

@todo_routes.route('/lists/<int:userId>')
def todo_lists(userId):
    todolists = TodoList.query.filter_by(user_id=userId).all()
    return {'todoLists': [todolist.to_dict() for todolist in todolists]}

@todo_routes.route('/lists', methods=['POST'])
def create_todo_lists():
    form = ToDoListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todolist = TodoList(
            user_id=form.data['user_id'],
            name=form.data['name']
        )
        db.session.add(todolist)
        db.session.commit()
        return todolist.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@todo_routes.route('/lists/<int:listId>', methods=['PUT'])
def edit_list(listId):
    form = EditToDoListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_list = TodoList.query.get(listId)

        edited_list.name = form.data['name']
        db.session.commit()

        return edited_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@todo_routes.route('/lists/<int:listId>', methods=['DELETE'])
def delete_list(listId):
    deleted_list = TodoList.query.get(listId)
    db.session.delete(deleted_list)
    db.session.commit()

    return f'{listId}'


@todo_routes.route('/tasks', methods=['POST'])
def todo_tasks():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('FORM DATA', form.data)
    if form.validate_on_submit():
        print("HITTING THIS LINE---------------------------------")
        print(form.data['status'])
        listId = form.data['list_id']
        task = TodoTask(
            list_id =listId,
            description = form.data['description'],
            status= form.data['status'] == 'true'
        )
        print(task)
        db.session.add(task)
        db.session.commit()

        edited_list = TodoList.query.get(listId)
        return edited_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@todo_routes.route('/tasks/<int:taskId>', methods=['DELETE'])
def delete_task(taskId):
    deleted_task = TodoTask.query.get(taskId)
    print('--------------------------------------')
    listId = deleted_task.list_id
    db.session.delete(deleted_task)
    db.session.commit()
    edited_list = TodoList.query.get(listId)
    return edited_list.to_dict()

@todo_routes.route('/tasks/<int:taskId>', methods=['PUT'])
def update_task(taskId):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_task = TodoTask.query.get(taskId)
        edited_task.description = form.data['description']
        edited_task.status = form.data['status'] == 'true'
        db.session.commit()

        listId = form.data['list_id']
        list = TodoList.query.get(listId)

        return list.to_dict()
