import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <nav>
        <ul>
          <li>HOME</li>
          <li>STARSHIPS</li>
        </ul>
      </nav>

      <main>{props.children}</main>
    </>
  );
};

export default Layout;
