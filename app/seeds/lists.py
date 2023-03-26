from app.models import db, TodoList

def seed_lists():
    demo_list = TodoList(
        user_id=1, name="Demo's To Do List"
    )
    abels_list = TodoList(
        user_id=2, name="Abel's To Do List"
    )
    labbits_list = TodoList(
        user_id=3, name="Labbit's To Do List"
    )
    lynns_list = TodoList(
        user_id=4, name="Demo's To Do List"
    )
    jkims_list = TodoList(
        user_id=5, name="Jonathan's To Do List"
    )
    davids_list = TodoList(
        user_id=6, name="David's To Do List"
    )

    db.session.add(demo_list)
    db.session.add(abels_list)
    db.session.add(labbits_list)
    db.session.add(lynns_list)
    db.session.add(jkims_list)
    db.session.add(davids_list)

    db.session.commit()


def undo_lists():
    db.session.execute('TRUNCATE todo_lists RESTART IDENTITY CASCADE;')
    db.session.commit()
