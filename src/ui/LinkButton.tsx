import { AnchorHTMLAttributes, forwardRef, ReactNode } from 'react';
import { createLink, LinkComponent, useRouter } from '@tanstack/react-router';

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'back' | 'children'> {
  children: ReactNode;
  back?: boolean;
}

const cusClassName =
  'text-sm text-blue-500 hover:text-blue-900 hover:underline';
const BasicLinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    return <a ref={ref} {...props} className={cusClassName} />;
  },
);
const CreateLinkComponent = createLink(BasicLinkComponent);
const LinkButton: LinkComponent<typeof BasicLinkComponent> = (props) => {
  const { history } = useRouter();
  const { children, back = false, ...others } = props;

  if (back)
    return (
      <button className={cusClassName} onClick={() => history.go(-1)}>
        {children as ReactNode}
      </button>
    );
  return <CreateLinkComponent {...others}>{children}</CreateLinkComponent>;
};

export default LinkButton;
