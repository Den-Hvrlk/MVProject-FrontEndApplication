import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./DropdownBox.css";

interface DropdownBoxProps {
  title: string;
  items: string[];
  createLink: string;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({
  title,
  items,
  createLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-box" ref={dropdownRef}>
      <p
        className="dropdown-title"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        {title}
      </p>
      {isOpen && (
        <div className="dropdown-content">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="dropdown-item">
                {item}
              </div>
            ))
          ) : (
            <div className="dropdown-item empty">
              {title == "МОЇ УГРУПОВАННЯ"
                ? "У вас немає угруповань"
                : "У вас немає фондів"}
            </div>
          )}
          <Link
            to={createLink}
            className="dropdown-add-button"
            onClick={() => setIsOpen(false)}
          >
            ➕
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownBox;
