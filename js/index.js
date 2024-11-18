document.addEventListener("DOMContentLoaded", () => {
    const progressContainers = document.querySelectorAll(".progress-input-container");
    const priceDisplay = document.querySelector("#mobile_price_status_value_total_int");
  
    // Configuration for the progress bars
    const config = [
      {
        baseValue: 59, // Starting price for "Upfront Cost"
        unit: "$", // Unit to append
        increment: 10, // Value to increase per 10% of progress
      },
      {
        baseValue: 12, // Starting value for "Length of Plan"
        unit: " months", // Unit to append
        increment: 1, // Value to increase per 10% of progress
      },
      {
        baseValue: 50, // Starting value for "Data"
        unit: "GB", // Unit to append
        increment: 5, // Value to increase per 10% of progress
      },
    ];
  
    const iphonePrice = 1200; // Made-up price for iPhone 16
    const dataFeePerGB = 1; // Assume $10 per GB of data
  
    // Function to calculate and update the monthly fee
    const updateMonthlyFee = () => {
      const upfrontCost = parseInt(progressContainers[0].querySelector("h6:nth-of-type(2)").textContent.replace("$", ""));
      const planDuration = parseInt(progressContainers[1].querySelector("h6:nth-of-type(2)").textContent.replace(" months", ""));
      const dataUsed = parseInt(progressContainers[2].querySelector("h6:nth-of-type(2)").textContent.replace("GB", ""));
  
      // Calculate remaining cost after upfront payment
      const remainingCost = Math.max(iphonePrice - upfrontCost, 0);
      let monthlyFee = remainingCost / planDuration;
  
      // Add data fee
      monthlyFee += dataUsed * dataFeePerGB;
      console.log(priceDisplay);
      
  
      // Update the display
      priceDisplay.innerHTML = Math.ceil(monthlyFee); // Round up to the nearest integer
    };
  
    // Attach click events to each progress bar
    progressContainers.forEach((container, index) => {
      const progressBar = container.querySelector(".progress-bar");
      const minusButton = container.querySelector(".btn-minus");
      const plusButton = container.querySelector(".btn-plus");
      const valueDisplay = container.querySelector("h6:nth-of-type(2)");
  
      const { baseValue, unit, increment } = config[index];
  
      // Function to update the displayed value for each bar
      const updateValue = (widthPercentage) => {
        const value = baseValue + Math.round((widthPercentage / 10) * increment);
        valueDisplay.textContent = `${value}${unit}`;
      };
  
      // Attach click event to the minus button
      minusButton.addEventListener("click", () => {
        let currentWidth = parseFloat(progressBar.style.width);
        currentWidth = Math.max(currentWidth - 10, 0); // Decrease by 10%, min 0%
        progressBar.style.width = `${currentWidth}%`;
        updateValue(currentWidth);
        updateMonthlyFee(); // Recalculate the monthly fee
      });
  
      // Attach click event to the plus button
      plusButton.addEventListener("click", () => {
        let currentWidth = parseFloat(progressBar.style.width);
        currentWidth = Math.min(currentWidth + 10, 100); // Increase by 10%, max 100%
        progressBar.style.width = `${currentWidth}%`;
        updateValue(currentWidth);
        updateMonthlyFee(); // Recalculate the monthly fee
      });
  
      // Initialize the display value and monthly fee based on the initial width
      const initialWidth = parseFloat(progressBar.style.width);
      updateValue(initialWidth);
    });
  
    updateMonthlyFee(); // Initial calculation on page load
  });
  