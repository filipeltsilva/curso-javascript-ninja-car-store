(function(win, doc, $) {
    'use strict';

    // var application = (function() {
    //     return {
    //         // formatCarPlate: function formatCarPlate() {

    //         // },

    //         getCompanyInfo: function getCompanyInfo() {
    //             var ajax = new XMLHttpRequest();

    //             ajax.open('GET', '/company.json', true);
    //             ajax.send();
    //             ajax.addEventListener('readystatechange', this.printCompanyInfo, false);
    //         },

    //         init: function init() {
    //             this.getCompanyInfo();
    //             this.initEvents();
    //         },

    //         initEvents: function initEvents() {
    //             $('[data-js="cars-register"]').on('submit', this.submitForm);
    //         },

    //         insertCar: function insertCar() {
    //             var fragment = document.createDocumentFragment();

    //             var carRow = document.createElement('tr');
    //             var carImage = document.createElement('td');
    //             var carModel = document.createElement('td');
    //             var carYear = document.createElement('td');
    //             var carPlate = document.createElement('td');
    //             var carColor = document.createElement('td');

    //             var image = document.createElement('img');
    //             image.src = $('[data-js="image"]').get().value;
    //             carImage.appendChild(image);

    //             carModel.textContent = $('[data-js="mark-model"]').get().value;
    //             carYear.textContent = $('[data-js="year"]').get().value;
    //             carPlate.textContent = $('[data-js="license-plate"]').get().value;
    //             carColor.textContent = $('[data-js="color"]').get().value;

    //             carRow.appendChild(carImage);
    //             carRow.appendChild(carModel);
    //             carRow.appendChild(carYear);
    //             carRow.appendChild(carPlate);
    //             carRow.appendChild(carColor);

    //             if (!application.validateCarPlate(carPlate.textContent))
    //                 console.log('placa inválida');

    //             return fragment.appendChild(carRow);
    //         },

    //         isRequestReady: function isRequestReady() {
    //             return this.readyState === 4 && this.status === 200;
    //         },

    //         printCompanyInfo: function printCompanyInfo() {
    //             if (!application.isRequestReady.call(this))
    //                 return;

    //             var companyData = JSON.parse(this.responseText);
    //             var companyName = $('[data-js="company-name"]').get();
    //             var companyPhone = $('[data-js="company-phone"]').get();

    //             companyName.textContent = companyData.name;
    //             companyPhone.textContent = companyData.phone;
    //         },

    //         submitForm: function submitForm(event) {
    //             event.preventDefault();

    //             var carsTable = $('[data-js="cars-table"]').get();
    //             carsTable.appendChild(application.insertCar());
    //         },

    //         validateCarPlate: function validateCarPlate(carPlate) {
    //             return new RegExp('([a-zA-Z]{3})(\d{4})','g');
    //         },

    //         validateFields: function validateFields() {
    //             return;
    //         }
    //     };
    // })();

    var application = (function app() {
        return {
            companyInfo: function companyInfo() {
                var ajax = new XMLHttpRequest();

                ajax.open('GET', 'data/company.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
            },

            createCarCellData: function createCarCellData(inputData) {
                var cell = doc.createElement('td');

                cell.textContent = this.getCarInformation(inputData);
                return cell;
            },

            createCarImageCell: function createCarImageCell(carInformation) {
                var imageCell = doc.createElement('td');
                var image = doc.createElement('image');

                image.setAttribute('src', );
                imageCell.appendChild(image);

                return imageCell;
            },

            createCarRow: function createCarRow() {
                var row = doc.createElement('tr');

                row.appendChild(this.createCarImageCell('[data-js="image"]'));
                row.appendChild(this.createCarCellData('[data-js="mark-model"]'));
                row.appendChild(this.createCarCellData('[data-js="year"]'));
                row.appendChild(this.createCarCellData('[data-js="license-plate"]'));
                row.appendChild(this.createCarCellData('[data-js="color"]'));

                return row;
            },

            getCarInformation: function getCarInformation(inputData) {
                return $(inputData).get().value;
            },

            getCompanyInfo: function getCompanyInfo() {
                if (!application.isRequestReady.call(this))
                    return;

                var companyData = JSON.parse(this.responseText);

                application.printCompanyInfo(companyData.name, companyData.phone);
            },

            initEvents: function initEvents() {
                $('[data-js="cars-register"]').on('submit', this.submitForm);
            },

            initialize: function initialize() {
                this.companyInfo();
                this.initEvents();
            },

            isRequestReady: function isRequestReady() {
                return this.state === 4 && this.status === 200;
            },

            printCompanyInfo: function printCompanyInfo(name, phone) {
                var companyName = $('[data-js="company-name"]');
                var companyPhone = $('[data-js="company-phone"]');

                companyName.get().textContent = name;
                companyPhone.get().textContent = phone;
            },

            // saveCarRegister: function saveCarRegister() {

            // },

            submitForm: function submitForm(event) {
                event.preventDefault();
                this.saveCarRegister();
            }
        };
    })();

    application.initialize();

})(window, document, window.DOM);
