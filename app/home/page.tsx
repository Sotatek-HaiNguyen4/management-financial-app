"use client";

import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, InputNumber, List, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

type Item = { id: number; date: string; amount: number; category: string };
type LocalData = { [date: string]: Item[] };

export default function Home() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [amount, setAmount] = useState<number | null>(null);
  const [category, setCategory] = useState("1");
  const [items, setItems] = useState<Item[]>([]);

  const STORAGE_KEY = "managementFinancial";
  const selectedDateStr = date.format("YYYY-MM-DD");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: LocalData = JSON.parse(raw);
      setItems(parsed[selectedDateStr] || []);
    }
  }, [selectedDateStr]);

  const saveToLocalStorage = (newItems: Item[]) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const allData: LocalData = raw ? JSON.parse(raw) : {};

    allData[selectedDateStr] = newItems;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  };

  const handleSave = () => {
    if (!amount) return;

    const newItem: Item = {
      id: Date.now(),
      date: selectedDateStr,
      amount,
      category,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
    setAmount(null);
  };

  const handleDelete = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  return (
    <div>
      <div className="flex justify-center my-2">
        <span className="text-2xl text-blue-300">Bạn đã mua gì ?</span>
      </div>

      <div className="border border-blue-300 rounded px-2 py-4 m-3 flex flex-col gap-2">
        <div className=" flex gap-5 items-center">
          <span className="min-w-[100px]">Ngày mua: </span>
          <DatePicker
            value={date}
            onChange={(d) => d && setDate(d)}
            allowClear={false}
            style={{ width: "100%" }}
          />
        </div>

        <div className="flex gap-5 items-center">
          <span className="min-w-[100px]">Danh mục: </span>
          <Select
            value={category}
            style={{ width: "100%" }}
            onChange={(value) => setCategory(value)}
            options={[
              { value: "1", label: "Ăn uống" },
              { value: "2", label: "Đi lại" },
              { value: "3", label: "Sức khỏe" },
              { value: "4", label: "Giáo dục" },
              { value: "5", label: "Mua sắm" },
              { value: "6", label: "Khác" },
            ]}
          />
        </div>

        <div className="flex gap-5 items-center">
          <span className="min-w-[100px]">Số tiền: </span>
          <InputNumber<number>
            value={amount ?? undefined}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            onChange={(value) => setAmount(value)}
            style={{ width: "100%" }}
          />
        </div>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleSave}>
          Lưu lại
        </Button>
      </div>

      <div className="mt-2 p-5">
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              actions={[
                <DeleteTwoTone
                  key={item.id}
                  onClick={() => handleDelete(item.id)}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />,
              ]}
            >
              <List.Item.Meta
                title={`${item.amount.toLocaleString()} đ - ${dayjs(
                  item.date
                ).format("DD/MM/YYYY")}`}
                description={`Danh mục: ${
                  {
                    "1": "Ăn uống",
                    "2": "Đi lại",
                    "3": "Sức khỏe",
                    "4": "Giáo dục",
                    "5": "Mua sắm",
                    "6": "Khác",
                  }[item.category]
                }`}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
