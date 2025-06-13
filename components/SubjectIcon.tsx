import React from 'react';

interface SubjectIconProps {
  subject: string;
}

const SubjectIcon: React.FC<SubjectIconProps> = ({ subject }) => {
  const getIconStyle = () => {
    switch (subject) {
      case 'PROBABILIDAD Y ESTADISTICA':
        return { icon: '📊', bg: '#E8F5FE' };
      case 'LIDERAZGO Y DESEMPEÑO':
        return { icon: '👥', bg: '#F0F4FF' };
      default:
        return { icon: '📚', bg: '#F5F5F5' };
    }
  };

  const { icon, bg } = getIconStyle();

  return (
    <div style={{
      width: 40, height: 40, borderRadius: 12, backgroundColor: bg,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
    </div>
  );
};

export default SubjectIcon;
