import Image from "next/image"; 
import { PropertyType } from "./PropertyList";
import React from "react";
import { useRouter } from "next/navigation";
import FavouriteButton from "../FavouriteButton";

interface PropertyProps{
    property:PropertyType,
    markFavourite?: (is_favourite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    markFavourite
}) => {

    const router = useRouter();


    return(
        <div className="cursor-pointer"
            onClick={() => router.push(`/properties/${property.id}`) }
        >
            
            
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image 
                    fill
                    src={property.image_url}
                    sizes="(max-width:768px) 768px), (max-width:1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />
                {markFavourite && (
                    <FavouriteButton
                        id={property.id}
                        is_favourite={property.is_favourite}
                        markFavourite={(is_favourite) => markFavourite(is_favourite)}
                    />
                )}

            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>Rs. {property.price_per_night}</strong> Per Night</p>
            </div>
        </div>
    )
}
export default PropertyListItem;