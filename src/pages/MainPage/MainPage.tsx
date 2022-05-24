import { useState } from "react";
import "./MainPage.styles.scss";
//import * as s from "./MainPage.styles.scss";

import "@nosferatu500/react-sortable-tree/style.css";
import SortableTree, {
  removeNodeAtPath,
  addNodeUnderParent,
  getNodeAtPath,
  changeNodeAtPath,
  defaultSearchMethod,
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
  const [searchString, setSearchString] = useState("");
  const [nodeClicked, setNodeClicked] = useState(false);
  /*  const [searchFocusIndex, setSearchFocusIndex] = useState(0);*/

  const updateTreeData = (data: any) => {
    setTreeData([...data]);
    //console.log(treeData);
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

  const removeNode = (path: number[]) => {
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

  const handleNodeClick = (node: any) => {
    setNodeClicked(node);
  };

  return (
    <>
      <div className="MainWrapper">Основная страница</div>

      <input
        placeholder="Search"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />

      <SortableTree
        treeData={treeData}
        onChange={updateTreeData}
        /*searchQuery={searchString}
        searchFocusOffset={1}
        searchMethod={defaultSearchMethod}*/
        //theme={FileExplorerTheme}
        generateNodeProps={({ node, path }) => ({
          style:
            node === nodeClicked
              ? {
                  border: "3px solid yellow",
                }
              : {},
          onClick: () => {
            handleNodeClick(node);
          },
          title: (
            <form
              onClick={(e) => {
                console.log("зашел в форму");
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <input
                style={{ fontSize: "1rem", width: 200 }}
                value={node.title}
                type="text"
                onChange={(event) => {
                  const title = event.target.value;

                  updateTreeData(
                    changeNodeAtPath({
                      treeData: treeData,
                      path,
                      getNodeKey: ({ treeIndex }) => treeIndex,
                      newNode: { ...node, title },
                    })
                  );
                }}
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
