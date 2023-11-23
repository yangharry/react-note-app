import Lightbulb from '../assets/Lightbulb.png';
import PriceTag from '../assets/PriceTag.png';
import Vector from '../assets/Vector.png';
import ShippingProduct from '../assets/ShippingProduct.png';
import TrashCan from '../assets/TrashCan.png';
import { useAppSelector } from '../app/hooks';
import { TagList } from '../app/reducers/tagSlice';

interface SideBarProps {
  setIsAddTags: React.Dispatch<React.SetStateAction<boolean>>;
  setSeletTag: React.Dispatch<React.SetStateAction<string>>;
}

export function SideBar({ setIsAddTags, setSeletTag }: SideBarProps) {
  const tags = useAppSelector((state) => state.tag);
  return (
    <div className="w-1/5 h-full bg-amber-100 font-bold">
      <div className="h-12 flex items-center pl-4 text-lg shadow">Keep</div>
      <div
        className="mt-4 p-4 flex items-center hover:shadow cursor-pointer"
        onClick={() => {
          setSeletTag('Notes');
        }}
      >
        <img src={Lightbulb} alt={Lightbulb} className="w-6 h-6" />
        <div className="pl-4 text-center">Notes</div>
      </div>
      {tags.map((tag: TagList) => {
        return (
          <div
            key={tag.id}
            className="mt-4 p-4 flex items-center hover:shadow cursor-pointer"
            onClick={() => {
              setSeletTag(tag.title);
            }}
          >
            <img src={PriceTag} alt={PriceTag} className="w-6 h-6" />
            <div className="pl-4 text-center">{tag.title}</div>
          </div>
        );
      })}
      <div className="mt-4 p-4 flex items-center cursor-pointer hover:shadow" onClick={() => setIsAddTags(true)}>
        <img src={Vector} alt={Vector} className="w-6 h-6" />
        <div className="pl-4 text-center">Edit Notes</div>
      </div>
      <div className="mt-4 p-4 flex items-center hover:shadow cursor-pointer">
        <img src={ShippingProduct} alt={ShippingProduct} className="w-6 h-6" />
        <div className="pl-4 text-center">Archive</div>
      </div>
      <div
        className="mt-4 p-4 flex items-center hover:shadow cursor-pointer"
        onClick={() => {
          setSeletTag('Trash');
        }}
      >
        <img src={TrashCan} alt={TrashCan} className="w-6 h-6" />
        <div className="pl-4 text-center">Trash</div>
      </div>
    </div>
  );
}
