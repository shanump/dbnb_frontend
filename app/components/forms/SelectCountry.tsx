'use client'

import Select from 'react-select' 
import useCountries from '@/app/hooks/useContries'

export type SelectCountryValue = {
    label:string;
    value:string; 
}

interface SelectContryProps {
    value?:SelectCountryValue;
    onChange:(value:SelectCountryValue) => void;
}

const SelectCountry: React.FC<SelectContryProps> =({
    value,
    onChange
}) => {
    const {getAll} = useCountries();
    return(
        <>
            <Select
                isClearable
                placeholder="Any Where"
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
            />
        </>
    )
}
export default SelectCountry