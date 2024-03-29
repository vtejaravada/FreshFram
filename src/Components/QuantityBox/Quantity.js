import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Quantity = (props) => {
    const [inputValue, setInputValue] = useState(1);

    const updateCart = (items) => {
        props.updateCart(items);
    };

    return (
        <>
            <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
                <div className="counterSec me-3">
                    <input type="number" value={inputValue} onChange={(e) => setInputValue(parseInt(e.target.value) || 1)} />
                    <span
                        className="arrow plus"
                        onClick={() => {
                            const updatedValue = inputValue + 1;
                            setInputValue(updatedValue);
                            const updatedCart = props.cartItems.map((cartItem, key) =>
                                key === parseInt(props.index) ? { ...cartItem, quantity: updatedValue } : { ...cartItem }
                            );
                            updateCart(updatedCart);
                        }}
                    >
                        <IoIosArrowUp style={{ fontSize: 20 }} />
                    </span>
                    <span
                        className="arrow minus"
                        onClick={() => {
                            if (inputValue !== 1) {
                                const updatedValue = inputValue - 1;
                                setInputValue(updatedValue);
                                const updatedCart = props.cartItems.map((cartItem, key) =>
                                    key === parseInt(props.index)
                                        ? { ...cartItem, quantity: cartItem.quantity !== 1 ? updatedValue : cartItem.quantity }
                                        : { ...cartItem }
                                );
                                updateCart(updatedCart);
                            }
                        }}
                    >
                        <IoIosArrowDown style={{ fontSize: 20 }} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Quantity;
