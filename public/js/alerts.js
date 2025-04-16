document.addEventListener("DOMContentLoaded", function () {
  const alerts = document.querySelectorAll(".alert.fade.show");

  alerts.forEach((alert) => {
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getInstance(alert);
      if (bsAlert) {
        bsAlert.close();
      } else {
        alert.classList.remove("show");
        alert.classList.add("fade");
        setTimeout(() => {
          alert.remove();
        }, 300);
      }
    }, 4000);
  });
});
