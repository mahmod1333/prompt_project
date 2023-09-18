"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdawn, settoggleDropdawn] = useState(false)
  
    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);

    return (
        <nav className="flex-between w-full md-16 pt-3">
            <Link href="/" className="flex gap-1 flex-content">
                <Image src="/assets/images/logo.svg"
                    alt='prompt logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className="logo_text">promotopia </p>
            </Link>
            {/*DeskTopnav*/}
            <div className="sm:flex hidden">
                {session?.user ? (<div className='flex gap-3 sm:gap-5'>
                    <Link className="black_btn" href="/create-prompet">
                        create
                    </Link>
                    <button type='button' className="outline_btn" onClick={signOut}>
                        Logout
                    </button>
                    <Link href="/profile">
                        <Image src={session.user.image}
                            alt='user profile'
                            width={37}
                            height={37}
                            className='rounded-full'
                        />
                    </Link>

                </div>)
                    : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button type='button' className="black_btn" onClick={() => signIn(provider.id)}>
                                        Sign in
                                    </button>
                                )
                                )
                            }
                        </>)
                }
            </div>

            {/*MobileNav*/}

            <div className="sm:hidden flex relative">
                {
                    session?.user ? (<div className='flex'>

                        <Image src={session.user.image}
                            alt='user profile'
                            width={37}
                            height={37}
                            className='rounded-full'
                            onClick={() => (settoggleDropdawn((prev) => !prev))}
                        />
                        {toggleDropdawn &&

                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" onClick={() => { settoggleDropdawn(false) }}>my profile</Link>
                                <Link href="/create-prompet" className="dropdown_link" onClick={() => { settoggleDropdawn(false) }}>create prompet</Link>
                                <button type='button' className="mt-5 w-full black_btn" onClick={() => {
                                    settoggleDropdawn(false);
                                    signOut()
                                }}>
                                    Logout
                                </button>
                            </div>

                        }
                    </div>) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button type='button' className="black_btn" onClick={() => signIn(provider.id)}>
                                        Sign in
                                    </button>
                                )
                                )
                            }
                        </>
                    )
                }

            </div>
        </nav>
    )
}

export default Nav