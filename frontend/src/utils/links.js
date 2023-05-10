import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  {
    id: 1,
    text: 'Create Exam',
    path: '/exam',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'Attend Exam',
    path: 'attend',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'Report Generation',
    path: 'report',
    icon: <FaWpforms />,
  },
  
];

export default links;