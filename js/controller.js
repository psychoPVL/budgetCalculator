const controller = (function (budgetCtrl, uiCtrl) {
    const setupEventListeners = function () {
        const DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
    };

    function updatePercentages() {
        budgetCtrl.calculatePercentage();

        const idsAndPercents = budgetCtrl.getAllIdsAndPercebtages();

        uiCtrl.updataItemPercentages(idsAndPercents);
    }

    function ctrlAddItem(event) {
        event.preventDefault();

        const input = uiCtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();

            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFields();
            generateTestData.init();

            updateBudget();

            updatePercentages();
        }
    }

    function ctrlDeleteItem(event) {
        let itemID, splitID, type, ID;

        if (event.target.closest('.item__remove')) {
            itemID = event.target.closest('li.budget-list__item').id;
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, ID);

            uiCtrl.deleteListItem(itemID);

            updateBudget();
        }
    }

    function updateBudget() {
        budgetCtrl.calculateBudget();

        budgetObj = budgetCtrl.getBudget();

        uiCtrl.updateBudget(budgetObj);
    }

    return {
        init: function () {
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            });
        },
    };
})(modelController, viewController);

controller.init();
