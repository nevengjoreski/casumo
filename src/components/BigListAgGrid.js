import React, {Component, useRef, useState} from 'react'
import faker from 'faker';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import Filters from "./Filters";

const NUMBER_OF_RECORDS = 1000000
const GENRES = ['comedy', 'horror', 'action', 'sci-fi', 'documentary', 'adventure', 'finance']
const GENDERS = ['male', 'female', 'other']

function lastFridayOfMonth(year, month) {
    var lastDay = new Date(year, month+1, 0);
    if(lastDay.getDay() < 5) {
        lastDay.setDate(lastDay.getDate() - 7);
    }
    lastDay.setDate(lastDay.getDate() - (lastDay.getDay() -5));
    return lastDay;
}


class Book {

    constructor() {
        this.name = faker.commerce.productName()
        this.author = new Author();
        this.date = faker.date.past(6).toLocaleDateString()
        this.genre = faker.random.arrayElement(GENRES)

        //forceHalloweenFinanceFriday
        if(this.genre === 'horror' && this.author.gender === 'male'){
            this.date = (new Date(2014, 9, 31)).toLocaleDateString()
        }
        //forceHalloween
        if(this.genre === 'horror' && this.author.gender === 'other'){
            this.date = (new Date(2018, 9, 31)).toLocaleDateString()
        }
    }
}

class Author {

    constructor() {
        this.name = faker.name.findName()
        this.gender = faker.random.arrayElement(GENDERS)
    }
}

function createBooks() {
    let tmp = []
    for (let i = 0; i < NUMBER_OF_RECORDS; i++) {
        let book_tmp = new Book()
        let record = {}
        record.bookname = book_tmp.name
        record.author = book_tmp.author.name
        record.gender = book_tmp.author.gender
        record.genre = book_tmp.genre
        record.date = book_tmp.date
        tmp.push(record)
    }
    return tmp
}


class MainTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [{
                headerName: "#", valueGetter: "node.rowIndex + 1", width: 100

            }, {
                headerName: "Book Name", field: "bookname", sortable: true, width: 250, cellStyle: { fontFamily: "Tangerine", fontSize: '30px' }
            }, {
                headerName: "Author", field: "author", sortable: true, width: 250
            }, {
                headerName: "Gender", field: "gender", filter: true, width: 100
            }, {
                headerName: "Genre", field: "genre", filter: true, width: 200
            }, {
                headerName: "Date", field: "date", width: 200
            }],
            rowData: props.books,
            style: {
                width: '1150px',
                height: 'calc( 100vh - 150px )',
                fontFamily: 'Bree Serif',
                fontSize: '15px'
            },
            rowClassRules: {
                "halloween": function(params) {
                    // ● Indicate books in the "horror" genre, published on Halloween October 31
                    if(!params.data){
                        return false
                    }
                    let date = new Date(params.data.date);
                    return date.getDate() === 31 && date.getMonth() + 1 === 10
                        && params.data.genre === 'horror'
                },
                'financeLastFriday': function(params){
                    if(!params.data){
                        return false
                    }
                    // ● Indicate books in the "finance" genre, published on the last Friday of any month
                    let date = new Date(params.data.date);
                    let date_localised = date.toLocaleDateString()
                    let last_friday = lastFridayOfMonth(date.getFullYear(), date.getMonth()).toLocaleDateString()

                    return date_localised === last_friday
                        && params.data.genre === 'finance'
                },
                'fridayHalloween': function(params) {
                    if(!params.data){
                        return false
                    }
                    let date = new Date(params.data.date);
                    let date_localised = date.toLocaleDateString()
                    let last_friday = lastFridayOfMonth(date.getFullYear(), date.getMonth()).toLocaleDateString()

                    return date.getDate() === 31
                        && date.getMonth() + 1 === 10
                        && date_localised === last_friday
                },
            },
            overlayLoadingTemplate: `<span class="ag-overlay-loading-center overlay">
                                        Loading ... Please Wait
                                    </span>`,
            rowBuffer: 0,
            rowModelType: "infinite",
            rowSelection: "multiple",
            paginationPageSize: 1000,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 3,
            infiniteInitialRowCount: 1000000
        }

    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.updateData(this.props.books);
    }

    setLoading = () => {
        this.gridApi.showLoadingOverlay();
    }

    updateData = (data) => {

        this.gridApi.showLoadingOverlay();
        let _this = this

        setTimeout(function() {
            _this.gridApi.setDatasource({
                rowCount: null,
                getRows: function (params) {
                    console.log("asking for " + params.startRow + " to " + params.endRow);
                    let rowsThisPage = data.slice(params.startRow, params.endRow);
                    let lastRow = -1;
                    if (data.length <= params.endRow) {
                        lastRow = data.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                }
            });
            _this.gridApi.hideOverlay();
        }, 100)
    }

    render() {
        return (
            <>
                <div className="ag-theme-balham-dark" style={{display:'flex' }} >
                    <div style={this.state.style}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            modules={this.state.modules}
                            enableCellChangeFlash={true}
                            onGridReady={this.onGridReady}
                            rowClassRules={this.state.rowClassRules}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            rowBuffer={this.state.rowBuffer}
                            rowDeselection={true}
                            rowModelType={this.state.rowModelType}
                            rowSelection={this.state.rowSelection}
                            paginationPageSize={this.state.paginationPageSize}
                            cacheOverflowSize={this.state.cacheOverflowSize}
                            maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
                            infiniteInitialRowCount={this.state.infiniteInitialRowCount}
                        >
                        </AgGridReact>
                    </div>
                    <TableInfo/>
                </div>
            </>
        );
    }
}

const TableInfo = () => (
    <div className={'info'}>
        <p>Hello Future Collegue</p>
        <p>You can use the filters on the table header, or use the filters with the buttons on top of the table</p>
        <p className={'financeLastFriday'}>This Is 'Finance' Last Friday of Month</p>
        <p className={'fridayHalloween'}>This Is 'Halloween' Last Friday Of Month</p>
        <p className={'halloween'}>This Is Horror Halloween Published</p>
    </div>
)

const BigListAgGrid = () => {

    let [books] = useState(createBooks)
    const childRef = useRef();

    const updateBooks = (data) => {
            childRef.current.updateData(data)
    }

    const setLoading = () => {
        childRef.current.setLoading()
    }

    return (
        <div>
            <Filters books={books} GENDERS={GENDERS} GENRES={GENRES} setBooks={updateBooks} setLoading={setLoading} className={'filters'} />
            <MainTable books={books} ref={childRef}/>
        </div>
    );
}

export default BigListAgGrid;