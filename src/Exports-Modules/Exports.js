import * as React from 'react';
import { lazy } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Popper from '@mui/material/Popper';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/joy/Button';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Skeleton from '@mui/material/Skeleton';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';

import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HourglassFullRoundedIcon from '@mui/icons-material/HourglassFullRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';








import Logout from '@mui/icons-material/LogoutRounded';

//date pickers 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


//ICONOS DE MUI MATERIA

import ListItemIcon from '@mui/material/ListItemIcon';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';



//componentes de antd design
import { Modal } from 'antd';
import { Divider } from 'antd';
import { notification } from 'antd';

import locale from 'antd/es/date-picker/locale/es_ES';




import Logotipo from '../BLogos/LogoKT.png';


const drawerWidth = 250;

export {
    React,
    lazy,
    axios,
    useCallback,
    useRef,
    //mui material
    Box,
    Chip,
    Grid,
    Tabs,
    Tab,
    Fade,
    List,
    Menu,
    Badge,
    Paper,
    Logout,
    AppBar,
    Popper,
    Drawer,
    Avatar,
    Toolbar,
    Tooltip,
    MenuIcon,
    MenuItem,
    Checkbox,
    Skeleton,
    ListItem,
    TextField,
    Container,
    PropTypes,
    IconButton,
    Typography,
    CssBaseline,
    CardContent,
    ListItemText,
    ListItemButton,
    FormControlLabel,
    CircularProgress,
    GroupsRoundedIcon,
    CheckRoundedIcon,
    CloseRoundedIcon,
    HourglassFullRoundedIcon,
    AdminPanelSettingsRoundedIcon,
    AssignmentIndRoundedIcon,
    ArrowRightRoundedIcon,
    ArrowLeftRoundedIcon,

    //date pickers
    DatePicker,
    AdapterDayjs,
    LocalizationProvider,


    //iconos mui materila
    BrowserUpdatedIcon,
    AttachMoneyRoundedIcon,
    DeleteForeverRoundedIcon,
    ListItemIcon,
    AddRoundedIcon,
    ExpandMoreIcon,
    SearchRoundedIcon,
    PublishRoundedIcon,
    SettingsRoundedIcon,
    AddBusinessRoundedIcon,
    EventAvailableRoundedIcon,

    //componentes de antd
    locale,
    Divider,
    Modal,
    Card,
    notification,

    //otros
    drawerWidth,
    useEffect,
    useState,
    useContext,
    Swal,
    Button,

    //Componentes
    Logotipo,

};