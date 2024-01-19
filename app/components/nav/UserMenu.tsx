'use client'

import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "@/app/components/nav/MenuItem";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import BackDrop from "./BackDrop";


interface UserMenuProps {
    currentUser: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, SetIsOpen] = useState(false)

    const toggleOpen = useCallback(
        () => {
            SetIsOpen(prev => !prev)
        }, []
    )

    return (
        <>
            <div className={"relative z-30"}>
                <div onClick={toggleOpen}
                    className={"p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"}>
                    <Avatar src={currentUser?.image} />
                    <AiFillCaretDown />
                </div>
                {
                    isOpen && (
                        <div
                            className={"absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer "}>
                            {currentUser ? (
                                <div>
                                    <Link href={"/orders"}>
                                        <MenuItem onClick={toggleOpen}>
                                            Your orders
                                        </MenuItem>
                                    </Link>
                                    {currentUser.role === "ADMIN" ?
                                        <Link href={"/admin"}>
                                            <MenuItem onClick={toggleOpen}>
                                                Admin Dashboard
                                            </MenuItem>
                                        </Link> : <></>
                                    }

                                    <hr />
                                    <MenuItem onClick={() => {
                                        toggleOpen()
                                        signOut()
                                    }
                                    }>
                                        Logout
                                    </MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <Link href={"/login"}>
                                        <MenuItem onClick={toggleOpen}>
                                            Login
                                        </MenuItem>
                                    </Link>
                                    <Link href={"/register"}>
                                        <MenuItem onClick={toggleOpen}>
                                            Register
                                        </MenuItem>
                                    </Link>
                                </div>
                            )

                            }

                        </div>
                    )
                }
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserMenu;
