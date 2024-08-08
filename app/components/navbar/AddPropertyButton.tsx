'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import LoginModal from "../modals/LoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

interface AddPropertyButtonProps{
    userId?: string|null;

}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
        userId
}) => {
    const LoginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();

    const airbndYourHome = () =>{
        if (userId){
            addPropertyModal.open();
        }
        else{
            LoginModal.open();
        }

    }

    return (
        <div
            onClick={ airbndYourHome }
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
                            
            Djangobnb your home
        </div>
    )
}

export default AddPropertyButton;