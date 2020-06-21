import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import {IAddFormState} from "../../interfaces/IAddFormState"

class AddForm extends Component{
    state: IAddFormState = {
        isFormValid: false,
        formControls: {
            name: {
                value: '',
                label: 'Назва товару',
                errorMessage: 'Введіть назву',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            quantity: {
                value: '',
                label: 'Кількість товару',
                errorMessage: 'Введіть число',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    mustBeNumber: true
                }
            },
            price: {
                value: '',
                label: 'Ціна за одиницю товару',
                errorMessage: 'Введіть число',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    mustBeNumber: true
                }
            }
        }
    };

    submitHandler = (event: React.ChangeEvent) => {
        event.preventDefault();
        this.setState({
            isFormValid: false
        })
    }

    validateControl(value: number|string, mustBeNumber: boolean): number|string {
        if (mustBeNumber) {
            const newValue = +value;
            return !!newValue;
        }

        return value.trim();
    }

    onChangeHandler = (event: React.ChangeEvent, controlName: string) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;

        control.value = event.target.value;
        control.valid = this.validateControl(control.value, control.validation.mustBeNumber);
        if (!control.valid) {
            control.value = '';
        }

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    operateFormValues = () => {
        this.props.addProduct(this.state.formControls);
        const formControls = {...this.state.formControls};
        Object.keys(formControls).forEach(name => {
            formControls[name].value = '';
        })
        this.setState({
            formControls
        })
    }

    render() {
        return (
            <div className="AddForm">
                <form onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <button
                        disabled={!this.state.isFormValid}
                        onClick={this.operateFormValues}
                    >Додати товар
                    </button>
                </form>
            </div>
        );
    }
}

export default AddForm;