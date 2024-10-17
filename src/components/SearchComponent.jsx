import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicNoneIcon from '@mui/icons-material/MicNone';

export default function SearchPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Trình duyệt không hỗ trợ SpeechRecognition');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'vi-VN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = event => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setQuery(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (queryRef.current) {
        navigate(
          `/search?searchString=${encodeURIComponent(queryRef.current)}`
        );
        setQuery('');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [query, navigate]);

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    inputRef.current?.focus();
  };

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(inputRef.current.value.trim());
    if (query) {
      navigate(`/search?searchString=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [open]);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div className='flex justify-center'>
      <form
        action='#'
        className='relative w-[90%] sm:w-[50vw] max-w-md mb-2 sm:mb-0'
        onSubmit={handleSubmit}
      >
        <div className='relative flex items-center'>
          <input
            ref={inputRef}
            type='text'
            className='border border-gray-400 sm:bg-gray-200 w-full rounded-lg p-2 pr-16'
            placeholder='Tìm sản phẩm...'
            value={query}
            onClick={handleClick}
            onChange={handleChange}
            required
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 space-x-2'>
            <button type='button' onClick={handleVoiceSearch} className='py-2'>
              {isListening ? (
                <KeyboardVoiceIcon className='text-primary' />
              ) : (
                <MicNoneIcon className='text-primary' />
              )}
            </button>
            <button type='submit' className='py-2'>
              <SearchSharpIcon className='text-primary' />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
