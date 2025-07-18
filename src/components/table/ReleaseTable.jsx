import { Link } from 'react-router-dom';
import releasePlaceHolderImg from '../../assets/release-placeholder.png'
import threeDots from '../../assets/icons/vertical-threeDots.png'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LuImageDown } from 'react-icons/lu';
import { FiArrowRight } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import localDate from '../../hooks/localDate';

const ReleaseTable = ({ columns = [], data, }) => {
    return (
        <div className="table-wrapper">
            <table className="theme-table">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                    <th key={index}>{col.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {/* {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                            {renderCell ? renderCell(col.key, row) : row[col.key]}
                            </td>
                        ))}
                        </tr>
                    ))} */}
                    {
                        data?.map((d) => 
                            <tr key={d?._id}>
                                <td>
                                    <div
                                        to="/single-release"
                                        style={{ color: "#1C2024", textDecoration: "none" }}
                                        // state={{ release: row }}
                                        className="artistTable-img-row"
                                        >
                                        <img
                                            src={d?.imgUrl ? d.imgUrl : releasePlaceHolderImg}
                                            alt=""
                                            style={{ borderRadius: "6px" }}
                                        />
                                        <p>
                                            {d?.releaseTitle?.length > 22
                                            ? d?.releaseTitle.slice(0, 22) + "..."
                                            : d?.releaseTitle}
                                        </p>
                                    </div>
                                </td>
                                <td>{d?.userName}</td>
                                <td>{d?.labels?.map(label => label.labelName)}</td>
                                <td>{d?.UPC ? d.UPC : '--'}</td>
                                <td>{localDate(d?.date)}</td>
                                <td>
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger asChild>
                                            <button className="dropdown-trigger artist-dropdown-btn">
                                                <img src={threeDots} />
                                            </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content
                                            align="left"
                                            side="bottom"
                                            className="dropdown-content qcApproval-dropdown-content"
                                        >
                                            <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                <LuImageDown /> Download Artwork
                                            </div>
                                            </DropdownMenu.Item>
                                            <hr />
                                            <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                <FiArrowRight /> <span>Move to Review</span>
                                            </div>
                                            </DropdownMenu.Item>
                                            <hr />
                                            <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                <RiDeleteBin6Line /> <span>Reject Release</span>
                                            </div>
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ReleaseTable;