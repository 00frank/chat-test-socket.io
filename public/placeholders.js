const placeholdersForInput = [
  "Ingrese su lindo mensaje aqui!",
  "Aca va...",
  "Tu mensaje 😍😍😍",
  "El mensaje patrón 😠"
]

function changePlaceholder() {
  document.getElementById("message").placeholder = placeholdersForInput[Math.floor(Math.random() * ((placeholdersForInput.length-1) - 0)) + 0]
}