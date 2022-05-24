import React, { useState } from "react";
import { classifierStore } from "../../stores";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./MainPage.styles.scss";
//import * as s from "./MainPage.styles.scss";
//import { TreeItem } from "@mui/lab";
import IClassifierDto from "../../shared/interfaces/IClassifierDto";
import "@nosferatu500/react-sortable-tree/style.css";
import SortableTree, {
  insertNode,
  removeNodeAtPath,
  addNodeUnderParent,
  getNodeAtPath,
  TreeIndex,
  TreeNode,
} from "@nosferatu500/react-sortable-tree";
import { Button } from "@mui/material";
//import FileExplorerTheme from "@nosferatu500/theme-file-explorer";

const MainPage = () => {
  const data = [
    {
      title: "Comic Books",
      expanded: true,
      children: [
        { title: "Amazing Spider-Man" },
        { title: "The Incredible Hulk" },
        { title: "Action Comics" },
        { title: "Batman" },
        { title: "New Avengers" },
      ],
    },
    {
      title: "Historical Fiction",
      expanded: true,
      children: [
        { title: "The Help" },
        { title: "All the Light We Cannot See" },
        { title: " The Color Purple" },
        { title: " War and Peace" },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(data);
  const [node, setNode] = useState({});
  const [path, setPath] = useState<number[] | string[]>([]);

  const updateTreeData = (data: any) => {
    setTreeData([...data]);
  };

  const selectThis = (node: any, path: any) => {
    setNode(node);
    setPath(path);
  };

  const insertNewNode = (path: number[]) => {
    const parentNode = getNodeAtPath({
      treeData: treeData,
      path: path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: true,
    });

    let parentKey = parentNode?.treeIndex;
    if (parentKey === -1) {
      parentKey = undefined;
    }

    updateTreeData(
      addNodeUnderParent({
      treeData: treeData,
      newNode: { title: "", children: [] },
      expandParent: true,
      parentKey: parentKey,
      getNodeKey: ({ treeIndex }) => treeIndex,
    }).treeData
    );
  };

  const removeNode = (path: any) => {
    updateTreeData(
      removeNodeAtPath({
        treeData: treeData,
        path: path,
        getNodeKey: ({ treeIndex: number }) => {
          return number;
        },
        ignoreCollapsed: false,
      })
    );
  };

  /*const renderTree = (nodes: IClassifierDto) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleSelect = (
    event: React.SyntheticEvent,
    nodeIds: Array<string> | string
  ) => (console.log(nodeIds.at(0)), console.log(nodeIds.length, "количество"));*/

  return (
    <>
      <div className="MainWrapper">Основная страница</div>
      {/*<div className={s.MainWrapper}>Основная страница</div>*/}

      {/*<TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleSelect}
        multiSelect
        sx={{ height: 100, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(classifierStore.data)}
      </TreeView>*/}

      <SortableTree
        treeData={treeData}
        onChange={updateTreeData}
        //theme={FileExplorerTheme}
        generateNodeProps={({ node, path }) => ({
          title: (
            <form
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                selectThis(node, path);
              }}
            >
              <input
                style={{ fontSize: "1rem", width: 200 }}
                value={node.title}
                onChange={(event) => {}}
              />
              <Button
                variant="outlined"
                disableRipple
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  insertNewNode(path);
                }}
              >
                +
              </Button>

              <Button
                variant="outlined"
                disableRipple
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeNode(path);
                }}
              >
                -
              </Button>
            </form>
          ),
        })}
      />
    </>
  );
};

export default MainPage;
