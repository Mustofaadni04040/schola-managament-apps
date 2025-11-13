import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getRole } from "@/lib/getRole";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Attendance, Prisma } from "@prisma/client";
import Image from "next/image";

type AttendanceList = Attendance & {
  lesson: {
    name: string;
  };
};

const columns = [
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Present",
    accessor: "present",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Lesson",
    accessor: "lesson",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = async (item: AttendanceList, role?: string) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#ffdf98]"
  >
    <td className="flex items-center gap-4 p-4">
      {new Intl.DateTimeFormat("id-ID").format(new Date(item?.date))}
    </td>
    <td>{item?.present === true ? "Present" : "Absent"}</td>
    <td>{item?.studentId}</td>
    <td className="hidden md:table-cell">{item?.lesson?.name}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "student" || role === "teacher" ? (
          <>
            <FormContainer table="attendance" type="update" data={item} />
            <FormContainer table="attendance" type="delete" id={item?.id} />
          </>
        ) : null}
      </div>
    </td>
  </tr>
);

const AttendanceListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.AttendanceWhereInput = {};
  const { role, currentUserId } = await getRole();

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      switch (key) {
        case "studentId":
          query.studentId = value;
          break;
        case "lessonId":
          query.lessonId = parseInt(value!);
          break;
        case "search":
          query.OR = [
            { student: { name: { contains: value, mode: "insensitive" } } },
            {
              lesson: {
                subject: { name: { contains: value, mode: "insensitive" } },
              },
            },
          ];
          break;
        default:
          break;
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson = {
        teacherId: currentUserId!,
      };
      break;
    case "student":
      query.studentId = currentUserId!;
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            name: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.attendance.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 overflow-x-auto">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Attendances
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "student" && (
              <FormContainer table="attendance" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {data.length === 0 ? (
        <p className="text-center text-gray-400 text-sm mt-10">
          Data not found
        </p>
      ) : (
        <>
          <Table
            columns={columns}
            renderRow={(item) => renderRow(item, role)}
            data={data}
          />
          {/* PAGINATION */}
          <Pagination page={p} count={count} />
        </>
      )}
    </div>
  );
};

export default AttendanceListPage;
