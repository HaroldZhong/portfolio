import React, {
    ElementType,
    PropsWithChildren,
    useEffect,
    useState,
  } from "react";
  
  interface Props {
    delay?: number;
    transitionDuration?: number;
    wrapperTag?: ElementType;
    childTag?: ElementType;
    className?: string;
    childClassName?: string;
    visible?: boolean;
    onComplete?: () => any;
  }
  
  export default function FadeIn(props: PropsWithChildren<Props>) {
    const WrapperTag = props.wrapperTag || "div";
    const ChildTag = props.childTag || "div";
    
    // Simplified: Render everything visible immediately to fix content loading issue.
    // We can re-introduce staggered animation later if needed.
    
    return (
      <WrapperTag className={props.className}>
        {React.Children.map(props.children, (child) => {
          return (
            <ChildTag
              className={props.childClassName}
              style={{
                transition: "none",
                transform: "none",
                opacity: 1,
              }}
            >
              {child}
            </ChildTag>
          );
        })}
      </WrapperTag>
    );
  }
  