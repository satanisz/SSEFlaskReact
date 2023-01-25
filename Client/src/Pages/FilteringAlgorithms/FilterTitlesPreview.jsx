import React from 'react';
import PreviewElement from '../../Components/FilterPreview/PreviewElement';

function FilterTitlesPreview(props) {
    const title =   <PreviewElement
                    text={props.title + " "}
                    />

    const logicalOperator = <PreviewElement
                            text={props.logicalOperator + " "}
                            style="preview---logical-operator"
                            />
    
    return (
        <>
            
            <a href={"http://localhost:5000/filter/" + props.id}>{title}</a>

            {props.logicalOperator && logicalOperator}
        </>
    );
}

export default FilterTitlesPreview;