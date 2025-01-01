import React from 'react';
import {AutocompleteArrayInput, ReferenceArrayInput} from 'react-admin';

const ReferenceManyToManyInput = ({source, reference, ...rest}) => {
    return (
        <ReferenceArrayInput
            source={source}
            reference={reference}
            filterToQuery={(searchText) => ({name: searchText})} // Example filtering
            {...rest}
        >
            <AutocompleteArrayInput optionText="name" label='Опцiї'/>
        </ReferenceArrayInput>
    );
};

export default ReferenceManyToManyInput;
