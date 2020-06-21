import React, {Component} from "react";
import AddForm from "../AddForm/AddForm";
import {ICartState} from "../../interfaces/ICartState"

class Cart extends Component{
    state: ICartState = {
        products: [
            {name: 'Хліб', quantity: 1, price: 10},
            {name: 'Молоко', quantity: 2, price: 15},
            {name: 'Апельсини', quantity: 4, price: 5}
        ],
        total: 0,
        titles: [
            {
                name: 'Назва товару',
                valuesType: 'string',
                parameterToSort: 'name'
            },
            {
                name: 'Кількість',
                valuesType: 'number',
                parameterToSort: 'quantity'
            },
            {
                name: 'Ціна за одиницю товару',
                valuesType: 'number',
                parameterToSort: 'price'
            },
        ],
        currentTitleToSort: null,
        currentDirection: 'asc'
    };

    componentDidMount() {
        if (this.state.products.length) {
            this.calculateTotal(this.state.products);
        }
    }

    addProductHandler = formControls => {
        const newProduct = {
            name: formControls.name.value,
            quantity: formControls.quantity.value,
            price: formControls.price.value
        }
        const products = [...this.state.products, newProduct];
        this.calculateTotal(products);
        this.setState({
            products
        })
    }

    calculateTotal = products => {
        let total = products.reduce((sum, current) => {
            return sum + current.quantity * current.price;
        }, 0);
        this.setState({
            total
        })
    }

    changeQuantity = (input, index: number) => {
        const product = this.state.products[index];
        if (isNaN(+input.value)) {
            input.style.borderColor = 'red'; // classAdd
            return;
        } else {
            product.quantity = +input.value;
            input.style.borderColor = '';
        }

        const products = [...this.state.products];
        products[index] = product;
        this.calculateTotal(products);
        this.setState({
            products
        })
    }

    deleteProduct = (index: number) => {
        const products = [...this.state.products];
        products.splice(index, 1);
        this.calculateTotal(products);
        this.setState({
            products
        })
    }

    sortColumn = (title) => {
        let currentDirection = this.state.currentDirection;
        let currentTitleToSort = this.state.currentTitleToSort;
        let products = [...this.state.products];
        if (currentTitleToSort === title.name) {
            currentDirection = currentDirection === 'asc' ? 'desc' : 'asc';
        } else {
            currentTitleToSort = title.name;
            currentDirection = 'asc'
        }
        if (currentDirection === 'asc') {
            products.sort((a, b) => {
                return a[title.parameterToSort] > b[title.parameterToSort] ? 1 : -1;
            })
        } else {
            products.sort((a, b) => {
                return a[title.parameterToSort] < b[title.parameterToSort] ? 1 : -1;
            })
        }
        this.setState({
            currentDirection, currentTitleToSort, products
        });
    }

    render() {
        return (
            <div className="App">

                <AddForm addProduct={this.addProductHandler}/>

                <table>
                    <thead>
                    <tr>
                        {this.state.titles.map((title, index: number) => {
                            return (
                                <th key={index} onClick={this.sortColumn.bind(this, title)}>{title.name}
                                    {title.name === this.state.currentTitleToSort && <span> {this.state.currentDirection}</span>}
                                </th>
                            )
                        })}
                        <th>Видалити</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((product, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td><input type='text' value={product.quantity} onChange={event => this.changeQuantity(event.target, index)}/></td>
                                <td>{product.price} грн.</td>
                                <td><button onClick={this.deleteProduct.bind(this, index)}>Видалити</button></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Загальна вартість</td>
                        <td>{this.state.total} грн.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Cart;