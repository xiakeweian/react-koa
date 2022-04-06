/*
 * @Author: wuyanxia
 * @Date: 2022-03-01 17:20:44
 * @Last Modified by: wuyanxia
 * @Last Modified time: 2022-03-02 16:18:54
 * 角色管理菜单
 */
import React, { useState, useEffect } from "react";
import data from './data'
import { Switch, Checkbox, Divider } from 'antd'
import {flattenTree} from '../../../utils/utils.js'

interface itemProp {
    alias: string;
    checked: boolean;
    category: number;
    children: itemProp[] | null;
    code: string;
    hide_in_menu: boolean;
    id: number;
    name:  string;
    level: number;
    parent_id: number;
}



const CustomRole = (props: any) => {
    const [defaultData, setDefaultData] = useState<itemProp[]>(data)
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        setDefaultData(defaultData);
        const selected =
          flattenTree(defaultData)
            .filter((item:itemProp) => item.checked === true)
            .map((item:itemProp) => item.id) || [];
            setSelected(selected);
      }, [defaultData]);

    const pidData:number[] = [];
    function findParent(idx:number) {
        const flattenData = flattenTree(defaultData);
        flattenData.map((item:itemProp) => {
            if (idx === item.id) {
                const pid = item.parent_id;
                findParent(pid);
                pidData.push(pid);
            }
        });
        return pidData.filter((item) => item !== null);
    }

    const selectChange = (item:itemProp) => {
        const flattenCurData = flattenTree(item.children);
        const flattenData = flattenTree(defaultData);
        // 子孙
        const curChildrenData = flattenCurData;
        // 祖先
        const curParents = findParent(item.id);
        const curParent = flattenData.find((flat:itemProp) => flat.id === item.parent_id);
        // 父亲的兄弟
        const curParentSiblings = flattenData
          .filter((flat:itemProp) => flat.id !== curParent?.id && flat.parent_id === curParent?.parent_id)
          .map((sib:itemProp) => sib.id);
        // 父亲的父亲
        const curParentParent = flattenData?.find((flat:itemProp) => flat.id === curParent?.parent_id);
        // 父亲的叔伯
        const curParentParentSiblings = flattenData
          .filter(
            (flat:itemProp) => flat.parent_id === curParentParent?.parent_id && flat.id !== curParentParent?.id
          )
          .map((cur:itemProp) => cur.id);
        // 父亲的爷爷
        const curParentGrandfather = flattenData?.find((flat:itemProp) => flat.id === curParentParent?.parent_id);
        // 父亲的爷爷的兄弟
        const cutParentGrandfatherSiblings = flattenData
          ?.filter(
            (flat:itemProp) =>
              flat.parent_id === curParentGrandfather?.parent_id && flat.id !== curParentGrandfather?.id
          )
          .map((cur:itemProp) => cur.id);
        // 兄弟
        const siblings = flattenData
          .filter((cur:itemProp) => cur.id !== item.id && item.parent_id === cur.parent_id)
          .map((sib:itemProp) => sib.id);
        const curId = item.id;
        const pIds = curParents;
        const cIds = curChildrenData.map((cur:itemProp) => cur.id);
        const totalIds = pIds.concat([...cIds, curId]);
        const pData = flattenData.filter((flat:itemProp) => pIds.includes(flat.id));
        const isContain = [];
        pData.map((p:itemProp) => {
          const childrens = flattenTree(p.children);
          const a = childrens.some((chi:itemProp) => {
            return pIds.includes(chi.id);
          });
          isContain.push({ contain: a, id: p.id, name: p.name, code: p.code });
        });
    
        let curSelected = [];
        if (!selected.includes(item.id)) {
          // 查看selected中是否含有兄弟节点的数据，如果有则取消的当前选中的时候不取消父亲的选中
          curSelected = [...new Set(selected.concat(totalIds))];
        } else {
          let newData = [];
          if (selected.some(sel => siblings.includes(sel))) {
            newData = selected.filter(sel => ![...cIds, item.id].includes(sel));
          } else if (selected.some(sel => curParentSiblings.includes(sel))) {
            newData = selected.filter(sel => ![curParent.id, item.id, ...cIds].includes(sel));
          } else if (selected.some(sel => curParentParentSiblings.includes(sel))) {
            newData = selected.filter(
              sel => ![curId, curParent.id, curParentParent.id, ...cIds].includes(sel)
            );
          } else if (selected.some(sel => cutParentGrandfatherSiblings.includes(sel))) {
            newData = selected.filter(
              sel =>
                ![curId, curParent.id, curParentParent.id, curParentGrandfather.id, ...cIds].includes(
                  sel
                )
            );
          } else {
            newData = selected.filter(sel => !totalIds.includes(sel));
          }
          curSelected = [...new Set(newData)];
        }
        return curSelected;
      };


    const onChange = async (item:itemProp) => {
        const selected = await selectChange(item);
        setSelected(selected);
        const newData = switchConfigData(selected);
        setDefaultData(newData);
      };

      const handleSwitchChange = (data: itemProp) => {
        onChange(data)
    }

    const handleCheckChange = (data: itemProp) => {
        onChange(data)

    }

    // 递归修改数据
    const switchConfigData = (selectedValue: any) => {
        const newData = JSON.parse(JSON.stringify(defaultData));
        const loop:any = (data:itemProp[]) => {
            const curData = data.map(item => {
                const { children, id } = item;

                if (children && !!children.length) {
                    const chi = loop(children);
                    return {
                        ...item,
                        children: chi,
                        checked: selectedValue.includes(id),
                    };
                }
                return { ...item, checked: selectedValue.includes(id) };
            });
            return curData;
        };
        return loop(newData);
    };

    const renderRole = (data: any) => {


        return data && !!data.length && data.map((item: any) => {
            const categoryChildrenOne = item.children.filter((chi: any) => chi.category === 1)
            const categoryChildrenTwo = item.children.filter((chi: any) => chi.category === 2)

            return <div key={item.id} style={{ margin: '20px 0px', marginLeft: item.level > 0 ? 20 : 0 }}>
                <Switch
                    checked={item.checked}
                    // checked={selected.includes(item.checked)}
                    size='small' onChange={(checked) => handleSwitchChange(item)} />
                <span className="menu-name" style={{ marginLeft: 5 }}>{item.name}</span>
                {
                    categoryChildrenTwo.length > 0 && <Divider type="vertical" style={{ margin: '0px 20px' }} />
                }
                {categoryChildrenTwo.map((n: any) => <Checkbox
                    key={`${n.id}`}
                    // checked={selected.includes(n.checked)}
                    checked={n.checked}
                    style={{ marginRight: 20 }}
                    onChange={(e) => handleCheckChange(n)}
                >
                    {n.name}
                </Checkbox>)}
                {categoryChildrenOne && !!categoryChildrenOne.length && renderRole(categoryChildrenOne)}

            </div>
        })

    }

    return <div style={{ margin: '0px 20px' }}>
        {renderRole(defaultData)}
    </div>
};
export default CustomRole;
