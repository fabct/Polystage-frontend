/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAppState from '@/context';
import {
  createFormFirestore,
  readFormByIdFirestore,
  updateFormByIdFirestore,
} from '@/services/firebase/forms';

/**
 * @typedef {'text' | 'textarea' | 'radio' | 'checkbox'} InputType
 */


/**
 * @typedef {Object} Respondent
 * @property {string} uid
 * @property {string} name
 * @property {string} email
 * @property {string} photoUrl
 * @property {string} response
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Question
 * @property {string} title
 * @property {InputType} type
 * @property {boolean} withDescription
 * @property {string} [description]
 * @property {string[]} options
 * @property {string[]} [checkboxs]
 */

/**
 * @typedef {Object} FormsData
 * @property {string} [uid]
 * @property {string} title
 * @property {string} description
 * @property {Question[]} questions
 */

/**
 * @typedef {Object} ActionForms
 *  @property {(targetIndex: number, question: Question) => void} duplicateQuestion
 * @property {(targetIndex: number) => void} addQuestion
 * @property {(targetIndex: number) => void} deleteQuestion
 * @property {(targetIndex: number, key: 'title' | 'description', value: string) => void} onTitleOrDescriptioQuestionChange
 * @property {(targetIndex: number, value: boolean) => void} changeDescriptionStatus
 * @property {(targetIndex: number, type: InputType) => void} changeQuestionType
 * @property {(targetIndex: number) => void} addOption
 * @property {(targetIndex: number, optionIndex: number, value: string) => void} setOptionName
 *  @property {(targetIndex: number, optionIndex: number) => void} removeOption
 * @property {(targetIndex: number, value: string) => void} responseQuestion
 */

export default function useForms() {
  const [data, setData] = useState<FormsData>({ title: '', description: '', questions: [] });

  const [isLoading, setIsLoading] = useState(true);

  //const { auth, modal } = useAppState();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const editQuery = !!query.get('edit');

  const hasEditAccess = editQuery || id === 'new';

  function onHeadFormInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const action: ActionForms = {
    duplicateQuestion: function (targetIndex: number, question: Question) {
      const newData = { ...data };
      newData.questions.splice(targetIndex, 0, question);
      setData({ ...newData });
    },

    addQuestion: function (targetIndex: number) {
      const newData = { ...data };
      newData.questions.splice(targetIndex, 0, {
        title: '',
        withDescription: false,
        type: 'text',
        options: [],
        respondents: [],
      });
      setData({ ...newData });
    },

    deleteQuestion: function (targetIndex: number) {
      const newData = { ...data };
      newData.questions.splice(targetIndex, 1);
      setData({ ...newData });
    },

    onTitleOrDescriptioQuestionChange: function (
      targetIndex: number,
      key: 'title' | 'description',
      value: string,
    ) {
      const newData = { ...data };
      newData.questions[targetIndex][key] = value;
      setData({ ...newData });
    },

    changeDescriptionStatus: function (targetIndex: number, value: boolean) {
      const newData = { ...data };
      newData.questions[targetIndex].withDescription = value;
      setData({ ...newData });
    },

    changeQuestionType: function (targetIndex: number, type: InputType) {
      const newData = { ...data };
      newData.questions[targetIndex].type = type;
      newData.questions[targetIndex].options = [];
      setData({ ...newData });
    },

    addOption: function (targetIndex: number) {
      const newData = { ...data };
      newData.questions[targetIndex].options.push('');
      setData({ ...newData });
    },

    setOptionName: function (targetIndex: number, optionIndex: number, value: string) {
      const newData = { ...data };
      newData.questions[targetIndex].options[optionIndex] = value;
      setData({ ...newData });
    },

    removeOption: function (targetIndex: number, optionIndex: number) {
      const newData = { ...data };
      newData.questions[targetIndex].options.splice(optionIndex, 1);
      setData({ ...newData });
    },

    responseQuestion: function (targetIndex: number, value: string) {
      const newData = { ...data };

      const response = {
        /*uid: auth.userData.uid,
        name: auth.userData.displayName,
        email: auth.userData.email,
        photoUrl: auth.userData.photoURL,*/
        response: value,
        createdAt: new Date(Date.now()).toISOString(),
      };

      /*const respondentIndex = newData.questions[targetIndex].respondents.findIndex(
        (el) => el.uid === auth.userData.uid,
      );*/

      /*if (respondentIndex === -1) newData.questions[targetIndex].respondents.push(response);
      else newData.questions[targetIndex].respondents[respondentIndex] = response;*/

      setData({ ...newData });
    },
  };

  async function submit() {
    try {
      const confirm = window.confirm('are you sure to save this changes?');

      if (!confirm) return;

      //modal.openModal();

      if (id !== 'new') {
        await updateFormByIdFirestore(id || '', data);

        navigate('/');

        return alert('success update form');
      }

      //await createFormFirestore(auth.userData.uid, data);

      alert('success create form');

      navigate('/');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      //modal.closeModal();
    }
  }

  const getDataById = useCallback(
    async function () {
      try {
        if (id === 'new') return;

        setIsLoading(true);

        //modal.openModal();

        const result = await readFormByIdFirestore(id ?? '');

        setData(result as unknown as FormsData);
      } catch (error) {
        alert((error as Error).message);
      } finally {
        //modal.closeModal();

        setIsLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    getDataById();
    return () => setData({ title: '', description: '', questions: [] });
  }, [getDataById]);

  useEffect(() => {
    if (isLoading) return;

    //if (auth.isPending) return;

    // wait for loading

    //if ((!auth.isAuthenticated && id === 'new') || (!auth.isAuthenticated && editQuery)) {
      // if unauthorize user try to go to /form/new then redirect to home
      // if unauthorize user try to go to /form/{id}?edit=true then redirect to home

      //alert('unauthorized');

      //return navigate('/', { replace: true, state: location });
    //}
    //if (editQuery && auth.userData.uid !== data.uid) {
      // if user (not owner) try to go to /form/{id}?edit=true then redirect to home

      //alert('forbidden');

      //return navigate('/', { replace: true, state: location });
    //}
  }, [
    isLoading,
    //auth.isPending,
    //auth.isAuthenticated,
    //auth.userData.uid,
    data.uid,
    id,
    location,
    editQuery,
  ]);

  return {
    title: data.title,
    description: data.description,
    questions: data.questions,
    onHeadFormInputChange,
    action,
    submitEditForm: submit,
    hasEditAccess,
  };
}
