import * as React from 'react';
import * as data from '../data';
import { FieldSelectorOption } from './FieldSelectorOption';
import { FormBuilderContext } from './FormBuilderContext';

export interface IFieldSelectorProps {
    registry: data.FieldRegistry;
    onSelect?: (field: data.IField) => void;
}

export interface IFieldSelectorState { }

export class FieldSelector extends React.PureComponent<IFieldSelectorProps, IFieldSelectorState> {
    constructor() {
        super()
    }

    render() {
        const selectors = this.props.registry.getFields().map(def => {
            const { field, displayName, type } = def;
            const fieldDef = this.props.registry[field.type];
            if (fieldDef.selector) {
                const fieldSelectorProps: data.IFieldSelectorItemProps = {
                    field,
                    onClick: this.props.onSelect,
                };
                const component = React.createElement(fieldDef.selector, fieldSelectorProps);
                return component;
            }
            return <FieldSelectorOption field={field} key={type} label={displayName} onClick={this.props.onSelect}/>;
        });
        return (
            <FormBuilderContext>
                <div className='field-selector'>
                    {selectors}
                </div>
            </FormBuilderContext>
        );
    }
}