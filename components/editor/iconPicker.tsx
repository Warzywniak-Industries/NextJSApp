import React, { useState } from 'react';

interface IconPickerProps {
    onIconSelect: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ onIconSelect }) => {
    const [selectedIcon, setSelectedIcon] = useState('');

    const handleIconSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const icon = reader.result as string;
                setSelectedIcon(icon);
                onIconSelect(icon);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleIconSelect} />
            {selectedIcon && <img src={selectedIcon} alt="Selected Icon" />}
        </div>
    );
};

export { IconPicker };