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
            getFieldValue: function getFieldValue(inputData) {
                return $(inputData).get().value;
            },

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
            createCarDataCell: function createCarDataCell(inputData) {
                var cell = doc.createElement('td');

                cell.textContent = this.getFieldValue(inputData);

                return cell;
            },

            createCarImageCell: function createCarImageCell(inputData) {
                var imageCell = doc.createElement('td');
                var image = doc.createElement('img');

                image.src = this.getFieldValue(inputData);
                imageCell.appendChild(image);

                return imageCell;
            },

            createCarRegisterRow: function createCarRegisterRow() {
                var fragment = doc.createDocumentFragment();
                var row = doc.createElement('tr');

                row.appendChild(this.createCarImageCell('[data-js="image"]'));
                row.appendChild(this.createCarDataCell('[data-js="mark-model"]'));
                row.appendChild(this.createCarDataCell('[data-js="year"]'));
                row.appendChild(this.createCarDataCell('[data-js="license-plate"]'));
                row.appendChild(this.createCarDataCell('[data-js="color"]'));
                row.appendChild(this.createCarDeleteButton());

                row.setAttribute('data-js', 'table-row');

                return fragment.appendChild(row);
            },

            saveCarRegister: function saveCarRegister(event) {
                event.preventDefault();

                var carsTable = $('[data-js="cars-table"]').get();
                carsTable.appendChild(Application.createCarRegisterRow());
            },

            // Car delete button
            createCarDeleteButton: function createCarDeleteButton() {
                var button = doc.createElement('button');
                var cell = doc.createElement('td');

                button.addEventListener('click', this.deleteCarRegister);
                button.className = 'button button-delete';
                button.innerHTML = 'Excluir';
                button.setAttribute('data-js', 'car-register-delete');

                cell.appendChild(button);

                return cell;
            },

            deleteCarRegister: function deleteCarRegister(event) {
                event.preventDefault();

                var carsTable = $('[data-js="cars-table"]').get();

                if (confirm('Deseja excluir o registro?'))
                    carsTable.removeChild(this.parentNode.parentNode);
            }
        };
    })();

    Application.initialize();

})(window, document, window.DOM);
