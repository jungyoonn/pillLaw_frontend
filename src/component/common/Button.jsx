import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ variant = 'primary', size = 'md', block = false, to, href, disabled, children, ...props }) => {
  const sizeClass = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  }[size];

  const variantClass = {
    pilllaw: 'btn-pilllaw', // 기본 버튼
    secondary: 'btn-pilllaw-secondary', // 보조 버튼
    naver: 'btn-naver', // 네이버 버튼
    github: 'btn-github', // GitHub 버튼
    kakao: 'btn-kakao', // 카카오 버튼
    google: 'btn-google', // 구글 버튼
    insta: 'btn-insta', // 인스타그램 버튼
  }[variant];

  const blockClass = block ? 'w-full' : '';

  const buttonClass = `${variantClass} fw-bold rounded py-1 text-white ${sizeClass} ${blockClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} {...props}>
        {children}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} className={buttonClass} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={buttonClass} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
};

Button.propTypes = {
  variant: PropTypes.oneOf(['pilllaw', 'secondary', 'naver', 'github', 'kakao', 'google', 'insta']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  block: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
