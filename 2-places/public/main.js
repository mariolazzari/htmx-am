function showConfirmationModal(event) {
  event.preventDefault()

  document.body.insertAdjacentHTML("beforeend", confirmationModal)
  const dialog = document.querySelector("dialog")
  dialog.showModal()
}

document.querySelector("li").addEventListener("htmx:beforeRequest", showConfirmationModal)
