import { useEffect, useState } from 'react';
import { Input } from 'antd';

export default function PhoneInput(props) {
  const [formattedValue, setFormattedValue] = useState(null);

  useEffect(() => {
    setFormattedValue(formatValue(props.value));
  }, [props.value]);

  const formatValue = (value) => {
    if (!value) {
      props.onChange?.(null);

      return null;
    }

    let formatted = value.replace(/[^0-9]/g, '').substring(0, 11);

    const regex = getRegex(formatted.length);
    const clearedValue = formatted.replace(/[^0-9]/g, '');

    props.onChange?.(clearedValue);

    return formatted.replace(regex.search, regex.replace);
  }

  const getRegex = (length) => {
    let search = null;
    let replace = null;

    switch (length) {
      case 11:
        search = /(\d{2})(\d{1})(\d{4})(\d{4})/g;
        replace = '($1) $2 $3-$4';
        break;
      case 10:
        search = /(\d{2})(\d{4})(\d{4})/g;
        replace = '($1) $2-$3';
        break;
      case 9:
        search = /(\d{1})(\d{4})(\d{4})/g;
        replace = '$1 $2-$3';
        break;
      case 8:
      default:
        search = /(\d{4})(\d{4})/g;
        replace = '$1-$2';
        break;
    }

    return { search, replace };
  }

  return (
    <Input  {...props}
      value={formattedValue}
      onChange={(e) => formatValue(e.target.value)} />
  );
}