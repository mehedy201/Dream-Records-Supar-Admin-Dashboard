const useStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return { background: "#FFEBD8", color: "#FFA552" };
    case 'Review':
      return { background: '#D5EFFF', color: '#0090FF'};
    case 'Approved':
      return { background: '#E6F6EB', color: '#2A9B66'};
    case 'Action Required':
      return { background: "#FEEBEC", color: "#E5484D"  };
    case 'Takedown':
      return { background: "#FEEBEC", color: "#E5484D" };
    case 'ReSubmitted':
      return { background: '#E1F5FE', color: '#0277BD' };
    case 'Rejected':
      return { background: "#FEEBEC", color: "#E5484D" };
    case 'All':
      return { background: '#F5F5F5', color: '#616161' };
    default:
      return { backgroundColor: '#EEE', color: '#333' };
  }
};

export default useStatusStyle;