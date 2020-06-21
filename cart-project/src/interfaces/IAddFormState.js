export interface IAddFormState {
    isFormValid: boolean,
    formControls: {
        name: {
            value: string,
            label: string,
            errorMessage: string,
            valid: boolean,
            touched: boolean,
            validation: {
                required: boolean
            }
        },
        quantity: {
            value: string,
            label: string,
            errorMessage: string,
            valid: boolean,
            touched: boolean,
            validation: {
                required: boolean,
                mustBeNumber: boolean
            }
        },
        price: {
            value: string,
            label: string,
            errorMessage: string,
            valid: boolean,
            touched: boolean,
            validation: {
                required: boolean,
                mustBeNumber: boolean
            }
        }
    }
}