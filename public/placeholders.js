const placeholdersForInput = [
  "Ingrese su lindo mensaje aqui!",
  "Aca va...",
  "Tu mensaje πππ",
  "El mensaje patrΓ³n π "
]

function changePlaceholder() {
  document.getElementById("message").placeholder = placeholdersForInput[Math.floor(Math.random() * ((placeholdersForInput.length-1) - 0)) + 0]
}