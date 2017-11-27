(function(win, doc, $) {
    'use strict';

    var Application = (function application() {
        return {
            // Initializing application
            initialize: function init() {
                this.getCompanyInfo();
                this.initEvents();
            },

            initEvents: function initEvents() {
                $('[data-js="cars-register"]').on('submit', this.saveCarRegister);
            },

            // Helpers
            isRequestReady: function isRequestReady() {
                return this.readyState === 4 && this.status === 200;
            },

            // Getting company information
            getCompanyData: function getCompanyData(name, phone) {
                var companyName = $('[data-js="company-name"]').get();
                var companyPhone = $('[data-js="company-phone"]').get();

                companyName.textContent = name;
                companyPhone.textContent = phone;
            },

            getCompanyInfo: function getCompanyInfo() {
                var ajax = new XMLHttpRequest();

                ajax.open('GET', 'data/company.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.printCompanyInfo, false);
            },

            printCompanyInfo: function printCompanyInfo() {
                if (!Application.isRequestReady.call(this))
                    return;

                var companyData = JSON.parse(this.responseText);

                Application.getCompanyData(companyData.name, companyData.phone);
            },

            // Adding a new car in the application
            insertCar: function insertCar() {
                var fragment = doc.createDocumentFragment();

                var carRow = doc.createElement('tr');
                var carImage = doc.createElement('td');
                var carModel = doc.createElement('td');
                var carYear = doc.createElement('td');
                var carPlate = doc.createElement('td');
                var carColor = doc.createElement('td');

                var image = doc.createElement('img');
                image.src = $('[data-js="image"]').get().value;
                carImage.appendChild(image);

                carModel.textContent = $('[data-js="mark-model"]').get().value;
                carYear.textContent = $('[data-js="year"]').get().value;
                carPlate.textContent = $('[data-js="license-plate"]').get().value;
                carColor.textContent = $('[data-js="color"]').get().value;

                carRow.appendChild(carImage);
                carRow.appendChild(carModel);
                carRow.appendChild(carYear);
                carRow.appendChild(carPlate);
                carRow.appendChild(carColor);

                return fragment.appendChild(carRow);
            },

            saveCarRegister: function saveCarRegister(event) {
                event.preventDefault();

                var carsTable = $('[data-js="cars-table"]').get();
                carsTable.appendChild(Application.insertCar());
            }
        };
    })();

    Application.initialize();

})(window, document, window.DOM);
