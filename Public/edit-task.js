const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

let tempName;

// show single task
const showTask = async () => {
  try {
    const res = await fetch(`/api/v1/tasks/${id}`)
    const data = await res.json()
    const task = data.task

    const { _id: taskID, completed, name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    taskCompletedDOM.checked = completed
  } catch (error) {
    console.error(error)
  }
}

showTask()

// update task
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  editBtnDOM.textContent = 'Loading...'

  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const res = await fetch(`/api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
        completed: taskCompleted,
      }),
    })

    const data = await res.json()
    const task = data.task

    const { _id: taskID, completed, name } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    taskCompletedDOM.checked = completed

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'success, edited task'
    formAlertDOM.classList.add('text-success')

  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'error, please try again'
  }

  editBtnDOM.textContent = 'Edit'

  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
