import { ChangeEvent, Key, useEffect, useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlushIcon";
import { SizesType } from "@/app/types/SizesType";

type MenuItemFormPropertiesProps = {
  propName: string;
  propLabel: string;
  propsValues: SizesType[];
  setPropsValues: any;
};

export default function MenuItemFormProperties(
  props: MenuItemFormPropertiesProps
) {
  function addProperties() {
    props.setPropsValues((oldSizes: SizesType[]) => {
      return [...oldSizes, { name: "", extraPrice: 0 }];
    });
  }

  function removeProperties(indexToRemove: number) {
    props.setPropsValues((prev: SizesType[]) =>
      prev.filter((v: SizesType, index: number) => index !== indexToRemove)
    );
  }

  function editProperties(
    event: ChangeEvent<HTMLInputElement>,
    indexToEdit: number,
    prop: string
  ) {
    props.setPropsValues((prevSizes: SizesType[]) => {
      return prevSizes.map((size: SizesType, index: number) => {
        if (index === indexToEdit) {
          return {
            ...size,
            [prop]: event.target.value,
          };
        }
        return size;
      });
    });
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2 text-center">
      <span className="text-gray-600">{props.propLabel}</span>
      <div className="mt-2">
        {props.propsValues?.length > 0 &&
          props.propsValues.map((size, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div>
                <label htmlFor="size">{props.propName}</label>
                <input
                  id="size"
                  name="size"
                  type="text"
                  placeholder={`${props.propName} ...`}
                  value={size.name}
                  onChange={(e) => editProperties(e, index, "name")}
                />
              </div>
              <div>
                <label htmlFor="extraPrice">Preço extra</label>
                <input
                  id="extraPrice"
                  name="extraPrice"
                  type="text"
                  placeholder="Preço extra ..."
                  value={size.extraPrice}
                  onChange={(e) => editProperties(e, index, "extraPrice")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProperties(index)}
                  className="mb-3 bg-red-500 text-white px-2"
                >
                  <TrashIcon classname="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={addProperties}
        type="button"
        className="bg-white items-center"
      >
        <PlusIcon classname="w-6 h-6" />
        {props.propLabel}
      </button>
    </div>
  );
}
