import { useState } from 'react';

function useDynamicFields(initialFields) {
  const [fields, setFields] = useState(initialFields);

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const addField = (newField) => {
    setFields([...fields, newField]);
  };

  return {
    fields,
    handleFieldChange,
    addField,
    setFields,
  };
}

export default useDynamicFields;