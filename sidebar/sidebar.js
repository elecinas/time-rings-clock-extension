document.addEventListener('DOMContentLoaded', () => {
  const workInput = document.getElementById('workTime');
  const restInput = document.getElementById('restTime');
  const saveBtn = document.getElementById('saveBtn');
  const msg = document.getElementById('msg');

  //Cargar valores guardados al abrir
  const savedSettings = localStorage.getItem('timerSettings_v2');
  if (savedSettings) {
    const data = JSON.parse(savedSettings);
    workInput.value = data.work;
    restInput.value = data.rest;
  }

  // Guardar valores al hacer clic
  saveBtn.addEventListener('click', () => {
    const settings = {
      work: parseInt(workInput.value) || 25,
      rest: parseInt(restInput.value) || 5
    };
    
    localStorage.setItem('timerSettings_v2', JSON.stringify(settings));
    
    // Feedback visual
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 2000);
    
    // Opcional: Avisar al popup si está abierto (avanzado), 
    // pero como usan localStorage compartido, el popup lo leerá al reiniciar sesión.
  });
});